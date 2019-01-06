namespace game {
	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(ut.Core2D.TransformNode)
	@ut.requiredComponents(ut.Core2D.TransformLocalPosition)
	@ut.requiredComponents(game.AutoDestory)
	/** 自动销毁系统 */
	export class AutoDestroySystem extends ut.ComponentSystem {
		OnUpdate(): void {
			this.world.forEach([ut.Core2D.TransformNode, ut.Core2D.TransformLocalPosition, game.AutoDestory]
				, (transformNode, transformLocalPosition, autoDestory) => {
					let pos = transformLocalPosition.position
					if (pos.x < autoDestory.threshold) {

					}
				})
		}

	}
}