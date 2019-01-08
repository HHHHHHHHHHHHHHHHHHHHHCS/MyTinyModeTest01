namespace game {

	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(Gravity, Velocity)
	/** 重力事件 */
	export class GravitySystem extends ut.ComponentSystem {
		OnUpdate(): void {
			let dt = this.scheduler.deltaTime()

			this.world.forEach([Gravity, Velocity],
				(gravity, velocity) => {
					let v = velocity.velocity
					let g = gravity.gravity
					v.x += g.x * dt
					v.y += g.y * dt
					velocity.velocity = v

				})
		}

	}

}