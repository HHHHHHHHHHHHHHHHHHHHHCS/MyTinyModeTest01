namespace game {
	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(PlayerInput, ut.HitBox2D.HitBoxOverlapResults, ut.Core2D.Sprite2DSequencePlayer)
	/** 游戏结束事件 */
	export class GameOverSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			let gameOver = false

			this.world.forEach(
				[ut.Entity, PlayerInput, ut.HitBox2D.HitBoxOverlapResults, ut.Core2D.Sprite2DSequencePlayer],
				(entity, input, overlap, sequencePlayer) => {
					this.world.removeComponent(entity, game.PlayerInput)

					sequencePlayer.paused = true

					game.AudioService.PlayAudioSourceByName(this.world, 'audio_sfx_hit')

					gameOver = true
				}
			)

			if (gameOver) {
				GameService.GameOver(this.world)
			}
		}

	}
}