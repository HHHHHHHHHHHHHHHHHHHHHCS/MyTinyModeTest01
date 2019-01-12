
namespace game {

	/** 游戏的管理器 */
	export class GameService {

        /**
         * 单位的名字
         */
		private static playerEntityName: string = "Player"
		private static spawnerEntityName: string = "Spawner"

        /**
         * 游戏场景的名字
         */
		private static tutorialScenenName: string = "game.Tutorial"
		private static gameSceneName: string = "game.GameScene"
		private static pipesSceneName: string = "game.Pipes"
		private static scoreSceneName: string = "game.Score"
		private static gameOverSceneName: string = "game.GameOver"

        /**
         * 清除世界上的动画 和全部世界上的物体
         */
		public static Clear(world: ut.World) {
			ut.Tweens.TweenService.removeAllTweensInWorld(world)

			ut.EntityGroup.destroyAll(world, this.gameSceneName)
			ut.EntityGroup.destroyAll(world, this.scoreSceneName)
			ut.EntityGroup.destroyAll(world, this.gameOverSceneName)
			ut.EntityGroup.destroyAll(world, this.pipesSceneName)
		}


        /**
         * 第一次初始化教程
         */
		public static Initialize(world: ut.World) {
			this.StartTutorial(world)
		}

        /**
         * 启动教程场景
         */
		public static StartTutorial(world: ut.World) {
			//启动新的游戏场景,隐藏无效的界面
			this.NewGame(world)

			//暂停管子的产生
			this.SetSpawnerPaused(world, true)

			//得到主角
			let player = world.getEntityByName(this.playerEntityName)

			//禁用重力
			world.usingComponentData(player, [game.Gravity], (gravity) => {
				gravity.gravity = new ut.Math.Vector2(0, 0)
			})

			//得到玩家位置添加动画
			let transform = world.getComponentData(player, ut.Core2D.TransformLocalPosition)

			ut.Tweens.TweenService.addTween(world, //世界
				player,//目标
				ut.Core2D.TransformLocalPosition.position.y,//要修改的组件+属性
				transform.position.y, transform.position.y + 0.1,//原来值->动画的值
				0.4,//持续时间
				0,//开始延迟
				ut.Core2D.LoopMode.PingPong,//模式
				ut.Tweens.TweenFunc.InOutQuad,//动画的值变化方式
				false,//完成时候是否删除,循环时可以忽略
			)

			//使用默认的皮肤
			let skinConfig = world.getConfigData(game.SkinConfig)
			skinConfig.theme = game.SkinType.Day
			skinConfig.forced = true
			world.setConfigData(skinConfig)

			//游戏设置教程关卡
			let gameConfig = world.getConfigData(game.GameConfig)
			gameConfig.state = game.GameState.Tutorial
			world.setConfigData(gameConfig)

			//实例化教程场景
			ut.EntityGroup.instantiate(world, this.tutorialScenenName)

			//得到准备的图片,先设置alpha0
			let eReady = world.getEntityByName("Image_GetReady")
			ut.Tweens.TweenService.setValue(world,//世界
				eReady,//目标
				ut.Core2D.Sprite2DRenderer.color.a,//要修改的 组件+属性
				0,//要修改的值
			)

			//把准备图片 延迟2秒播放 0->1显示
			ut.Tweens.TweenService.addTween(world,
				eReady,
				ut.Core2D.Sprite2DRenderer.color.a,
				0, 1,
				4.0,//周期
				-2.0,//初始执行的延长
				ut.Core2D.LoopMode.Once,//一次性
				ut.Tweens.TweenFunc.OutQuad,
				true,//播放完毕自动删除
			)

			//控制图片的显示
			ut.Tweens.TweenService.addTween(world,
				world.getEntityByName(`Image_Controls`),
				ut.Core2D.Shape2DRenderer.color.a,
				0, 1,
				4,
				0,
				ut.Core2D.LoopMode.Once,
				ut.Tweens.TweenFunc.OutQuad,
				true
			)
		}

        /**
         * 启动新的游戏场景
         */
		public static NewGame(world: ut.World) {
			this.Clear(world)
			ut.EntityGroup.instantiate(world, this.gameSceneName)

			let config = world.getConfigData(game.GameConfig)
			config.currentScore = 0
			config.currentScrollSpeed = config.scrollSpeed
			config.state = game.GameState.Play
			world.setConfigData(config)
		}

        /**
         * 设置敌人暂停产生
         */
		public static SetSpawnerPaused(world: ut.World, paused: boolean) {
			let entity = world.getEntityByName(this.spawnerEntityName)
			let spawner = world.getComponentData(entity, game.PipeSpawner)
			spawner.paused = paused
			world.setComponentData(entity, spawner)
		}

		/** 设置教程 */
		public static EndTutorial(world: ut.World) {
			ut.EntityGroup.destroyAll(world, this.tutorialScenenName)

			this.SetSpawnerPaused(world, false)

			let player = world.getEntityByName(this.playerEntityName)
			let gameConfig = world.getConfigData(game.GameConfig)

			//设置重力
			world.usingComponentData(player, [game.Gravity], (gravity) => {
				gravity.gravity = new ut.Math.Vector2(0, gameConfig.gravity)
			})

			ut.Tweens.TweenService.removeAllTweensInWorld(world)

			gameConfig.state = GameState.Play
			world.setConfigData(gameConfig)

			ut.EntityGroup.instantiate(world, this.scoreSceneName)
		}


		/** 游戏结束 */
		public static GameOver(world: ut.World) {
			ut.EntityGroup.destroyAll(world, this.scoreSceneName)

			this.SetSpawnerPaused(world, true)

			let gameConfig = world.getConfigData(game.GameConfig)

			gameConfig.currentScrollSpeed = 0

			if (gameConfig.currentScore > gameConfig.highScore) {
				gameConfig.highScore = gameConfig.currentScore
			}

			gameConfig.state = game.GameState.GameOver

			world.setConfigData(gameConfig)

			let gameOver = world.getEntityByName("Image_GameOver")
			let transform = world.getComponentData(gameOver, ut.Core2D.TransformLocalPosition)
			let end = transform.position
			let start = new Vector3(end.x, end.y + 1.0, end.z)

			ut.Tweens.TweenService.addTween(
				world,
				gameOver,
				ut.Core2D.TransformLocalPosition.position,
				start,
				end,
				1.35,
				0,
				ut.Core2D.LoopMode.Once,
				ut.Tweens.TweenFunc.OutBounce,
				true
			)

			ut.Tweens.TweenService.addTween(
				world,
				gameOver,
				ut.Core2D.Sprite2DRenderer.color.a,
				0,
				1,
				0.45,
				0,
				ut.Core2D.LoopMode.Once,
				ut.Tweens.TweenFunc.OutBounce,
				true
			)

			let board = world.getEntityByName("Image_ScoreBoard")
			transform = world.getComponentData(board, ut.Core2D.TransformLocalPosition)
			end = transform.position
			start = new Vector3(end.x, end.y - 1, end.z)
			ut.Tweens.TweenService.addTween(
				world,
				board,
				ut.Core2D.TransformLocalPosition.position,
				start,
				end,
				0.35,
				0.0,
				ut.Core2D.LoopMode.Once,
				ut.Tweens.TweenFunc.OutQuad,
				true
			)
		}
	}
}
