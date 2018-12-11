namespace game {

	//圆圈移动
	export class CircleMovement extends ut.ComponentSystem {

		static readonly twoPi: number = 2 * Math.PI;

		OnUpdate(): void {
			return;
			let dt = this.scheduler.deltaTime()

			this.world.forEach([ut.Entity, game.Thing], (entity, thing) => {
				let r = thing.radius
				let t = thing.time + dt

				let angle = t * CircleMovement.twoPi * thing.speed

				let x = r * Math.cos(angle)
				let y = r * Math.sin(angle)

				this.world.usingComponentData(entity, [ut.Core2D.TransformLocalPosition], (position) => {
					position.position = new Vector3(x, y, 0)
				})
				thing.time = t
			})
		}
	}

}
