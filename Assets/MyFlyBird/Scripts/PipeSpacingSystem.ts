namespace game {

	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(Spacing)
	@ut.optionalComponents(ut.Core2D.TransformLocalPosition)
	/** 管道系统 */
	export class PipeSpacingSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			this.world.forEach([Spacing],
				(spacing) => {
					let topPosition = this.world.getComponentData(spacing.top, ut.Core2D.TransformLocalPosition);
					let botPosition = this.world.getComponentData(spacing.bottom, ut.Core2D.TransformLocalPosition);

					topPosition.position = new Vector3(0, spacing.spacing * 0.5, 0);
					botPosition.position = new Vector3(0, -spacing.spacing * 0.5, 0);

					this.world.setComponentData(spacing.top,topPosition);
					this.world.setComponentData(spacing.bottom,botPosition);

				})
		}
	}
}