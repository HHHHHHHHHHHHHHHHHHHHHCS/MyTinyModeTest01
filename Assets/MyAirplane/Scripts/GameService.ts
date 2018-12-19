
namespace game {

	/** 游戏管理 */
	export class GameService {
		private static mainGroup: string = `game.MainGroup`
		private static enemyGroup: string = `game.EnemyGroup`
		private static effectGroup: string = `game.EffectGroup`

		public static Restart(world: ut.World) {
			setTimeout(() => {
				this.NewGame(world)
			}, 3000)
		}

		public static NewGame(world: ut.World) {
			Time.Reset();

			ut.EntityGroup.destroyAll(world, this.mainGroup)
			ut.EntityGroup.destroyAll(world, this.enemyGroup)
			ut.EntityGroup.destroyAll(world, this.effectGroup)

			ut.EntityGroup.instantiate(world, this.mainGroup)
		}
	}
}
