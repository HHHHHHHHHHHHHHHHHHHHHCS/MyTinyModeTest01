var game;
(function (game) {
    /** 游戏的管理器 */
    var GameService = /** @class */ (function () {
        function GameService() {
        }
        /**
         * 清除世界上的动画 和全部世界上的物体
         */
        GameService.Clear = function (world) {
            ut.Tweens.TweenService.removeAllTweensInWorld(world);
            ut.EntityGroup.destroyAll(world, this.gameSceneName);
            ut.EntityGroup.destroyAll(world, this.scoreSceneName);
            ut.EntityGroup.destroyAll(world, this.gameOverSceneName);
            ut.EntityGroup.destroyAll(world, this.pipesSceneName);
        };
        /**
         * 第一次初始化教程
         */
        GameService.Initialize = function (world) {
            this.StartTutorial(world);
        };
        /**
         * 启动教程场景
         */
        GameService.StartTutorial = function (world) {
            //启动新的游戏场景,隐藏无效的界面
            this.NewGame(world);
            //暂停管子的产生
            this.SetSpawnerPaused(world, true);
            //得到主角
            var player = world.getEntityByName(this.playerEntityName);
            //禁用重力
            world.usingComponentData(player, [game.Gravity], function (gravity) {
                gravity.gravity = new ut.Math.Vector2(0, 0);
            });
            //得到玩家位置添加动画
            var transform = world.getComponentData(player, ut.Core2D.TransformLocalPosition);
            ut.Tweens.TweenService.addTween(world, //世界
            player, //目标
            ut.Core2D.TransformLocalPosition.position.y, //要修改的组件+属性
            transform.position.y, transform.position.y + 0.1, //原来值->动画的值
            0.4, //持续时间
            0, //开始延迟
            ut.Core2D.LoopMode.PingPong, //模式
            ut.Tweens.TweenFunc.InOutQuad, //动画的值变化方式
            false);
            //使用默认的皮肤
            var skinConfig = world.getConfigData(game.SkinConfig);
            skinConfig.theme = game.SkinType.Day;
            skinConfig.forced = true;
            world.setConfigData(skinConfig);
            //游戏设置教程关卡
            var gameConfig = world.getConfigData(game.GameConfig);
            gameConfig.state = game.GameState.Tutorial;
            world.setConfigData(gameConfig);
            //实例化教程场景
            ut.EntityGroup.instantiate(world, this.tutorialScenenName);
            //得到准备的图片,先设置alpha0
            var eReady = world.getEntityByName("Image_GetReady");
            ut.Tweens.TweenService.setValue(world, //世界
            eReady, //目标
            ut.Core2D.Sprite2DRenderer.color.a, //要修改的 组件+属性
            0);
            //把准备图片 延迟2秒播放 0->1显示
            ut.Tweens.TweenService.addTween(world, eReady, ut.Core2D.Sprite2DRenderer.color.a, 0, 1, 4.0, //周期
            -2.0, //初始执行的延长
            ut.Core2D.LoopMode.Once, //一次性
            ut.Tweens.TweenFunc.OutQuad, true);
            //控制图片的显示
            ut.Tweens.TweenService.addTween(world, world.getEntityByName("Image_Controls"), ut.Core2D.Shape2DRenderer.color.a, 0, 1, 4, 0, ut.Core2D.LoopMode.Once, ut.Tweens.TweenFunc.OutQuad, true);
        };
        /**
         * 启动新的游戏场景
         */
        GameService.NewGame = function (world) {
            this.Clear(world);
            ut.EntityGroup.instantiate(world, this.gameSceneName);
            var config = world.getConfigData(game.GameConfig);
            config.currentScore = 0;
            config.currentScrollSpeed = config.scrollSpeed;
            config.state = game.GameState.Play;
            world.setConfigData(config);
        };
        /**
         * 设置敌人暂停产生
         */
        GameService.SetSpawnerPaused = function (world, paused) {
            var entity = world.getEntityByName(this.spawnerEntityName);
            var spawner = world.getComponentData(entity, game.EnemeySpawner);
            spawner.paused = paused;
            world.setComponentData(entity, spawner);
        };
        /**
         * 单位的名字
         */
        GameService.playerEntityName = "Player";
        GameService.spawnerEntityName = "Spawner";
        /**
         * 游戏场景的名字
         */
        GameService.tutorialScenenName = "game.Tutorial";
        GameService.gameSceneName = "game.GameScene";
        GameService.pipesSceneName = "game.Pipes";
        GameService.scoreSceneName = "game.Score";
        GameService.gameOverSceneName = "game.GameOver";
        return GameService;
    }());
    game.GameService = GameService;
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