namespace game {
	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(ScorePoint)
	@ut.optionalComponents(ut.Audio.AudioSource)
	/** 游戏得分系统 */
	export class ScorePointSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			let player = this.world.getEntityByName(`Player`);
			if (player.isNone()) {
				return;
			}

			let gameConfig = this.world.getConfigData(GameConfig);
			let playerPosition = ut.Core2D.TransformService.computeWorldPosition(this.world, player);

			this.world.forEach([ut.Entity, ScorePoint, ut.Core2D.TransformObjectToWorld],
				(entity, scorePoint, o2w) => {
					let position = new Vector3(
						o2w.matrix.elements[12], o2w.matrix.elements[13], o2w.matrix.elements[14]);
					if (position.x < playerPosition.x) {
						gameConfig.currentScore += scorePoint.value;
						this.world.removeComponent(entity, game.ScorePoint);

						AudioService.PlayAudioSourceByName(this.world, "audio_sfx_point");
					}
				});

			this.world.setConfigData(gameConfig);
		}
	}
}