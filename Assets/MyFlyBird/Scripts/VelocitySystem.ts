namespace game {

	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(PlayerInput, Velocity)
	/** 玩家力移动系统 */
	export class VelocitySystem extends ut.ComponentSystem {
		OnUpdate(): void {
			this.world.forEach([ut.Core2D.TransformLocalPosition, Velocity],
				(transform, velocity) => {
					let p = transform.position;
					let v = velocity.velocity;

					p.x += v.x;
					p.y += v.y;

					transform.position = p;
				});
		}
	}
}