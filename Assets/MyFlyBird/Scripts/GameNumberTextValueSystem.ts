namespace gmae {
	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	//@ut.executeBefore(game.NumberTextRenderingSystem)
	@ut.requiredComponents(game.NumberTextRenderer, game.GameConfigTextValue)
	/** 游戏分数系统 */
	export class GameNumberTextValueSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			let gameConfig = this.world.getConfigData(game.GameConfig)
			this.world.forEach([ut.Entity, game.NumberTextRenderer, game.GameConfigTextValue]
				, (entity, renderer, value) => {
					renderer.value=gameConfig[value.key]
				})
		}

	}
}