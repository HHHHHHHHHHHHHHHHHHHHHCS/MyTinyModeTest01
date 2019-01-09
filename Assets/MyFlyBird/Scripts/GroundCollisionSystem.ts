namespace game {

	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.requiredComponents(Gravity, ut.HitBox2D.HitBoxOverlapResults)

	/** 碰到下地板的时候 */
	export class GroundCollisionSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			this.world.forEach([ut.Entity, Velocity, ut.HitBox2D.HitBoxOverlapResults],
				(entity, velocity, overlap) => {
					let grounded = false
					let overLaps = overlap.overlaps

					for(var item of overLaps){
						let other = item.otherEntity
						if (this.world.hasComponent(other, Ground)) {
							grounded = true
							break
						}
					}

					if (grounded) {
						this.world.removeComponent(entity, Velocity)
					}

					this.world.usingComponentData(entity, [ut.Core2D.TransformLocalPosition],
						(position) => {
							let p = position.position
							if (p.y < -0.95) {
								p.y = -0.95
							}
						})
				})

		}
	}
}
