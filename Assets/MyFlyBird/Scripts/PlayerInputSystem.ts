namespace game {
	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(PlayerInput, Velocity)
	/** 玩家输入系统 */
	export class PlayerInputSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			if (this.world.getConfigData(GameConfig).state != GameState.Play) {
				return
			}

			if (!ut.Runtime.Input.getMouseButton(0)) {
				return
			}

			AudioService.PlayAudioSourceByName(this.world, `audio_sfx_wing`)

			this.world.forEach(
				[ut.Entity, PlayerInput, Velocity],
				(eneity, input, velocity) => {
					velocity.velocity = new ut.Math.Vector2(0, input.force)
				}
			)
		}

	}
}