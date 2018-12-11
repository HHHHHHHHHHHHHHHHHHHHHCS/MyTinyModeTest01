
namespace game {

	//普通的log
	export class LogPosition extends ut.ComponentSystem {

		static onlyOnce: boolean = false

		OnUpdate(): void {
			return;
			if (LogPosition.onlyOnce) {
				return
			}

			LogPosition.onlyOnce = true

			this.world.forEach([ut.Entity, ut.Core2D.TransformNode], (entity, transformNode) => {
				let worldPos = ut.Core2D.TransformService.computeWorldPosition(this.world, entity);

				console.log(`${this.world.getEntityName(entity)} is
				 at (${worldPos.x},${worldPos.y})`)
			})
		}

	}
}
