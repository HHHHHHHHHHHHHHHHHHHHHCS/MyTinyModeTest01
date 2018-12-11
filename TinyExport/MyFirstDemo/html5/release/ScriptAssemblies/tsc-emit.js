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
    //圆圈移动
    var CircleMovement = /** @class */ (function (_super) {
        __extends(CircleMovement, _super);
        function CircleMovement() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        CircleMovement.prototype.OnUpdate = function () {
            var _this = this;
            return;
            var dt = this.scheduler.deltaTime();
            this.world.forEach([ut.Entity, game.Thing], function (entity, thing) {
                var r = thing.radius;
                var t = thing.time + dt;
                var angle = t * CircleMovement.twoPi * thing.speed;
                var x = r * Math.cos(angle);
                var y = r * Math.sin(angle);
                _this.world.usingComponentData(entity, [ut.Core2D.TransformLocalPosition], function (position) {
                    position.position = new Vector3(x, y, 0);
                });
                thing.time = t;
            });
        };
        CircleMovement.twoPi = 2 * Math.PI;
        return CircleMovement;
    }(ut.ComponentSystem));
    game.CircleMovement = CircleMovement;
})(game || (game = {}));
var game;
(function (game) {
    var FrameCounterFilter = /** @class */ (function (_super) {
        __extends(FrameCounterFilter, _super);
        function FrameCounterFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FrameCounterFilter;
    }(ut.EntityFilter));
    game.FrameCounterFilter = FrameCounterFilter;
    var FrameCounter = /** @class */ (function (_super) {
        __extends(FrameCounter, _super);
        function FrameCounter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FrameCounter.prototype.OnEntityEnable = function () {
            return;
            console.log("FrameCounter enabled");
            this.data.counter.frame = 0;
        };
        FrameCounter.prototype.OnEntityUpdate = function () {
            return;
            var frame = this.data.counter.frame + 1;
            this.data.counter.frame = frame;
            console.log("frame " + frame);
            if (frame == 5) {
                this.Disable(this.world, this.data.entity);
            }
        };
        FrameCounter.prototype.OnEntityDisable = function () {
            return;
            console.log("FrameCounter disabled");
        };
        return FrameCounter;
    }(ut.ComponentBehaviour));
    game.FrameCounter = FrameCounter;
})(game || (game = {}));
var game;
(function (game) {
    //输入检测用
    var InputSystem = /** @class */ (function (_super) {
        __extends(InputSystem, _super);
        function InputSystem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InputSystem.prototype.OnUpdate = function () {
            //return;
            //好像不支持input.anyKeyDown
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.W)) {
                this.MovePos(new Vector3(0, 1, 0));
            }
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.S)) {
                this.MovePos(new Vector3(0, -1, 0));
            }
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.A)) {
                this.MovePos(new Vector3(-1, 0, 0));
            }
            if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.D)) {
                this.MovePos(new Vector3(1, 0, 0));
            }
            if (ut.Runtime.Input.getMouseButtonDown(0)) {
                console.log("mouse input 0 ");
            }
        };
        InputSystem.prototype.MovePos = function (dir) {
            var _this = this;
            dir.multiplyScalar(this.scheduler.deltaTime());
            this.world.forEach([ut.Entity, ut.Core2D.TransformLocalPosition], function (entity, pos) {
                if (!_this.world.hasComponent(entity, ut.Core2D.Camera2D)) {
                    pos.position = pos.position.add(dir);
                }
            });
        };
        InputSystem = __decorate([
            ut.executeAfter(ut.Shared.InputFence)
        ], InputSystem);
        return InputSystem;
    }(ut.ComponentSystem));
    game.InputSystem = InputSystem;
})(game || (game = {}));
var game;
(function (game) {
    //普通的log
    var LogPosition = /** @class */ (function (_super) {
        __extends(LogPosition, _super);
        function LogPosition() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LogPosition.prototype.OnUpdate = function () {
            var _this = this;
            return;
            if (LogPosition.onlyOnce) {
                return;
            }
            LogPosition.onlyOnce = true;
            this.world.forEach([ut.Entity, ut.Core2D.TransformNode], function (entity, transformNode) {
                var worldPos = ut.Core2D.TransformService.computeWorldPosition(_this.world, entity);
                console.log(_this.world.getEntityName(entity) + " is\n\t\t\t\t at (" + worldPos.x + "," + worldPos.y + ")");
            });
        };
        LogPosition.onlyOnce = false;
        return LogPosition;
    }(ut.ComponentSystem));
    game.LogPosition = LogPosition;
})(game || (game = {}));
var game;
(function (game) {
    var MoveBeFilter = /** @class */ (function (_super) {
        __extends(MoveBeFilter, _super);
        function MoveBeFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MoveBeFilter;
    }(ut.EntityFilter));
    game.MoveBeFilter = MoveBeFilter;
    var MoveBe = /** @class */ (function (_super) {
        __extends(MoveBe, _super);
        function MoveBe() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MoveBe.prototype.OnEntityEnable = function () {
            return;
            console.log(this.world.getConfigData(game.GraConf).gra, this.world.getConfigData(game.GraConf).pi);
            console.log("MoveBe enabled");
            console.log(this.world.getEntityName(this.entity));
        };
        return MoveBe;
    }(ut.ComponentBehaviour));
    game.MoveBe = MoveBe;
})(game || (game = {}));
var game;
(function (game) {
    var MovementFilter = /** @class */ (function (_super) {
        __extends(MovementFilter, _super);
        function MovementFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MovementFilter;
    }(ut.EntityFilter));
    game.MovementFilter = MovementFilter;
    //组件过滤移动用
    var MovementSystem = /** @class */ (function (_super) {
        __extends(MovementSystem, _super);
        function MovementSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.filter = new MovementFilter();
            return _this;
        }
        MovementSystem.prototype.OnUpdate = function () {
            var _this = this;
            return;
            var dt = this.scheduler.deltaTime();
            this.filter.ForEach(this.world, function (entity) {
                var data = _this.filter;
                var s = data.Movement.speed;
                if (data.SpeedBoost) {
                    var m = data.SpeedBoost.multiplier;
                    s.x *= m;
                    s.y *= m;
                }
                var localPostion = data.position;
                var p = localPostion.position;
                localPostion.position = new Vector3(p.x + s.x * dt, p.y + s.y * dt, 0);
            });
        };
        return MovementSystem;
    }(ut.ComponentSystem));
    game.MovementSystem = MovementSystem;
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