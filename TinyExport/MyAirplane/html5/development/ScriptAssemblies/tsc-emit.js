var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var game;
(function (game) {
    /** 游戏管理 */
    var GameService = /** @class */ (function () {
        function GameService() {
        }
        GameService.Restart = function (world) {
            var _this = this;
            setTimeout(function () {
                _this.NewGame(world);
            }, 3000);
        };
        GameService.NewGame = function (world) {
            game.Time.Reset();
            ut.EntityGroup.destroyAll(world, this.mainGroup);
            ut.EntityGroup.destroyAll(world, this.enemyGroup);
            ut.EntityGroup.destroyAll(world, this.explosionGroup);
            ut.EntityGroup.instantiate(world, this.mainGroup);
        };
        GameService.mainGroup = "game.MainGroup";
        GameService.enemyGroup = "game.EnemyGroup";
        GameService.explosionGroup = "game.ExplosionGroup";
        return GameService;
    }());
    game.GameService = GameService;
})(game || (game = {}));
var game;
(function (game) {
    var PlayerMoveFilter = /** @class */ (function (_super) {
        __extends(PlayerMoveFilter, _super);
        function PlayerMoveFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PlayerMoveFilter;
    }(ut.EntityFilter));
    game.PlayerMoveFilter = PlayerMoveFilter;
    /** 飞机的移动 */
    var InputMovementSystem = /** @class */ (function (_super) {
        __extends(InputMovementSystem, _super);
        function InputMovementSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isAwake = true;
            _this.filter = new PlayerMoveFilter();
            return _this;
        }
        InputMovementSystem.prototype.OnUpdate = function () {
            var _this = this;
            if (this.isAwake) {
                this.isAwake = false;
                if (ut.Core2D.Input.isTouchSupported()) {
                    console.log("isTouchSupported():" + ut.Core2D.Input.isTouchSupported());
                }
            }
            var dt = game.Time.DeltaTime();
            this.filter.ForEach(this.world, function (entity) {
                var data = _this.filter;
                var pos = data.pos.position;
                var moveSpeed = data.speed.speed * dt;
                var dir;
                if (ut.Core2D.Input.isTouchSupported()) {
                    dir = _this.ProcessTouchInput(entity);
                }
                else {
                    dir = _this.ProcessKeyboardInput();
                }
                pos = pos.add(dir.multiplyScalar(moveSpeed));
                pos.x = Math.max(data.border.minX, Math.min(data.border.maxX, pos.x));
                pos.y = Math.max(data.border.minY, Math.min(data.border.maxY, pos.y));
                data.pos.position = pos;
            });
        };
        InputMovementSystem.prototype.ProcessTouchInput = function (entity) {
            if (this.cameraEntity == null) {
                this.cameraEntity = this.world.getEntityByName("Camera");
                var config = this.world.getConfigData(ut.Core2D.DisplayInfo);
                this.cameraSize = new Vector2(config.width, config.height);
            }
            var dir = new Vector3();
            if (ut.Core2D.Input.touchCount() > 0) {
                var touch = ut.Core2D.Input.getTouch(0);
                var worldPos = ut.Core2D.TransformService.computeWorldPosition(this.world, entity);
                var transPos = ut.Core2D.TransformService.worldToWindow(this.world, this.cameraEntity, worldPos, this.cameraSize);
                if (touch.x > transPos.x) {
                    dir.x += 1;
                }
                else if (touch.x < transPos.x) {
                    dir.x -= 1;
                }
                if (touch.y > transPos.y) {
                    dir.y += 1;
                }
                else if (touch.y < transPos.y) {
                    dir.y -= 1;
                }
                if (touch.phase == ut.Core2D.TouchState.Moved) {
                    //console.log("moved: " + ut.Core2D.Input.touchCount());
                }
                else if (touch.phase == ut.Core2D.TouchState.Ended) {
                    //console.log("ended: " + ut.Core2D.Input.touchCount());
                }
                else if (touch.phase == ut.Core2D.TouchState.Stationary) {
                    //console.log("holding: " + ut.Core2D.Input.touchCount());
                }
                else if (touch.phase == ut.Core2D.TouchState.Canceled) {
                    //console.log("cancelled: " + ut.Core2D.Input.touchCount());
                }
                else if (touch.phase == ut.Core2D.TouchState.Began) {
                    //console.log("began: " + ut.Core2D.Input.touchCount());
                }
                else {
                    console.log("NO TOUCH STATE!!!");
                }
            }
            return dir;
        };
        InputMovementSystem.prototype.ProcessKeyboardInput = function () {
            var dir = new Vector3();
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.W)) {
                dir.y += 1;
            }
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.S)) {
                dir.y -= 1;
            }
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.A)) {
                dir.x -= 1;
            }
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.D)) {
                dir.x += 1;
            }
            return dir;
        };
        InputMovementSystem = __decorate([
            ut.executeAfter(ut.Shared.InputFence)
        ], InputMovementSystem);
        return InputMovementSystem;
    }(ut.ComponentSystem));
    game.InputMovementSystem = InputMovementSystem;
})(game || (game = {}));
var game;
(function (game) {
    /** 移动背景 */
    var ScrollingBgSystem = /** @class */ (function (_super) {
        __extends(ScrollingBgSystem, _super);
        function ScrollingBgSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ScrollingBgSystem.prototype.OnUpdate = function () {
            var dt = game.Time.DeltaTime();
            this.world.forEach([ut.Core2D.TransformLocalPosition, game.ScrollingBg], function (pos, scrolling) {
                var localPos = pos.position;
                localPos.y -= scrolling.speed * dt;
                if (localPos.y < scrolling.threshold) {
                    localPos.y += scrolling.distance;
                }
                pos.position = localPos;
            });
        };
        return ScrollingBgSystem;
    }(ut.ComponentSystem));
    game.ScrollingBgSystem = ScrollingBgSystem;
})(game || (game = {}));
var game;
(function (game) {
    /** 创建敌人的系统 */
    var SpawnEnemySystem = /** @class */ (function (_super) {
        __extends(SpawnEnemySystem, _super);
        function SpawnEnemySystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpawnEnemySystem.prototype.OnUpdate = function () {
            var _this = this;
            this.world.forEach([game.EnemySpawner], function (spawner) {
                if (spawner.isPaused) {
                    return;
                }
                var timer = spawner.timer;
                var delay = spawner.delay;
                timer -= game.Time.DeltaTime();
                if (timer <= 0) {
                    timer += delay;
                    ut.EntityGroup.instantiate(_this.world, spawner.spawnGroup);
                }
                spawner.timer = timer;
            });
        };
        return SpawnEnemySystem;
    }(ut.ComponentSystem));
    game.SpawnEnemySystem = SpawnEnemySystem;
})(game || (game = {}));
var game;
(function (game) {
    /** 类似Unity 的Time API */
    var Time = /** @class */ (function (_super) {
        __extends(Time, _super);
        function Time() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Time_1 = Time;
        Time.DeltaTime = function () {
            return Time_1._deltaTime;
        };
        Time.Time = function () {
            return Time_1._time;
        };
        Time.Reset = function () {
            Time_1._time = 0;
        };
        Time.prototype.OnUpdate = function () {
            var dt = this.scheduler.deltaTime();
            Time_1._deltaTime = dt;
            Time_1._time += dt;
        };
        var Time_1;
        Time._deltaTime = 0;
        Time._time = 0;
        Time = Time_1 = __decorate([
            ut.executeBefore(ut.Shared.UserCodeStart)
        ], Time);
        return Time;
    }(ut.ComponentSystem));
    game.Time = Time;
})(game || (game = {}));
var ut;
(function (ut) {
    var EntityGroup = /** @class */ (function () {
        function EntityGroup() {
        }
        /**
         * @method
         * @desc Creates a new instance of the given entity group by name and returns all entities
         * @param {ut.World} world - The world to add to
         * @param {string} name - The fully qualified name of the entity group
         * @returns Flat list of all created entities
         */
        EntityGroup.instantiate = function (world, name) {
            var data = this.getEntityGroupData(name);
            if (data == undefined)
                throw "ut.EntityGroup.instantiate: No 'EntityGroup' was found with the name '" + name + "'";
            return data.load(world);
        };
        ;
        /**
         * @method
         * @desc Destroys all entities that were instantated with the given group name
         * @param {ut.World} world - The world to destroy from
         * @param {string} name - The fully qualified name of the entity group
         */
        EntityGroup.destroyAll = function (world, name) {
            var type = this.getEntityGroupData(name).Component;
            world.forEach([ut.Entity, type], function (entity, instance) {
                // @TODO This should REALLY not be necessary
                // We are protecting against duplicate calls to `destroyAllEntityGroups` within an iteration
                if (world.exists(entity)) {
                    world.destroyEntity(entity);
                }
            });
        };
        /**
         * @method
         * @desc Returns an entity group object by name
         * @param {string} name - Fully qualified group name
         */
        EntityGroup.getEntityGroupData = function (name) {
            var parts = name.split('.');
            if (parts.length < 2)
                throw "ut.Streaming.StreamingService.getEntityGroupData: name entry is invalid";
            var shiftedParts = parts.shift();
            var initialData = entities[shiftedParts];
            if (initialData == undefined)
                throw "ut.Streaming.StreamingService.getEntityGroupData: name entry is invalid";
            return parts.reduce(function (v, p) {
                return v[p];
            }, initialData);
        };
        return EntityGroup;
    }());
    ut.EntityGroup = EntityGroup;
})(ut || (ut = {}));
var ut;
(function (ut) {
    var EntityLookupCache = /** @class */ (function () {
        function EntityLookupCache() {
        }
        EntityLookupCache.getByName = function (world, name) {
            var entity;
            if (name in this._cache) {
                entity = this._cache[name];
                if (world.exists(entity))
                    return entity;
            }
            entity = world.getEntityByName(name);
            this._cache[name] = entity;
            return entity;
        };
        EntityLookupCache._cache = {};
        return EntityLookupCache;
    }());
    ut.EntityLookupCache = EntityLookupCache;
})(ut || (ut = {}));
//# sourceMappingURL=tsc-emit.js.map