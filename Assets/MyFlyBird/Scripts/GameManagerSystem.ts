namespace game {
	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	export class GameManagerSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			var config = this.world.getConfigData(game.GameConfig)

			switch (config.state) {
				case GameState.Initialize: {
					GameService.Initialize(this.world);
					break;
				}
				case GameState.Menu:{
					break;
				}
				case GameState.Tutorial:{
					if(ut.Runtime.Input.getMouseButtonDown(0)){
						GameService.en
					}
					break;
				}
				case GameState.Play:{
					break;
				}
			}
		}

	}
}