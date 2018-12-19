namespace game {

	/** 玩家的碰撞事件 */
	export class PlayerCollisionSystem extends ut.ComponentSystem {
		private static effectGroup: string = "game.EffectGroup"

		OnUpdate(): void {
			let isGameOver = false
			let filter = [ut.Entity, ut.Core2D.TransformLocalPosition, ut.HitBox2D.HitBoxOverlapResults, game.PlayerTag]
			this.world.forEach(filter, (entity, position, contacts, tag) => {
				let explosion = ut.EntityGroup.instantiate(this.world, PlayerCollisionSystem.effectGroup)[0]

				this.world.usingComponentData(explosion, [ut.Core2D.TransformLocalPosition], (pos) => {
					pos.position = position.position
				})

				this.world.destroyEntity(entity)
				isGameOver = true
			})

			
			if(isGameOver)
			{
				GameService.Restart(this.world);
			}

		}

	}
}