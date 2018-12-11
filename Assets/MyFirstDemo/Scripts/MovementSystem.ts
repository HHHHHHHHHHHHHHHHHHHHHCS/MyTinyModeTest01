
namespace game {

	export class MovementFilter extends ut.EntityFilter {
		node: ut.Core2D.TransformNode
		position: ut.Core2D.TransformLocalPosition
		Movement: game.Movement
		SpeedBoost?: game.SpeedBoost
	}


	//组件过滤移动用
	export class MovementSystem extends ut.ComponentSystem {

		filter: MovementFilter = new MovementFilter()

		OnUpdate(): void {
			return;
			let dt = this.scheduler.deltaTime()
			this.filter.ForEach(this.world, (entity) => {
				let data = this.filter

				var s = data.Movement.speed

				if (data.SpeedBoost) {
					let m = data.SpeedBoost.multiplier
					s.x *= m
					s.y *= m
				}

				var localPostion = data.position
				let p = localPostion.position
				localPostion.position = new Vector3(p.x + s.x * dt, p.y + s.y * dt, 0)
			})
		}
	}
}
