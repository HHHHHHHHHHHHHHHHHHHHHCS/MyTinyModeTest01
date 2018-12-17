namespace game {
	/** 敌人的筛选器 */
	export class EnemyBehaviorFilter extends ut.EntityFilter {
		entity: ut.Entity
		tag: game.EnemeyTag
		position: ut.Core2D.TransformLocalPosition
		speed: game.MoveSpeed
		speedChange: game.ChangeOverTime
		bounds: game.Border
	}

	/** 敌人的逻辑 */
	export class EnemyBehavior extends ut.ComponentBehaviour {
		data: EnemyBehaviorFilter;

		OnEntityEnable(): void {
			let totalTIme = Time.Time()
			let newSpeed = this.data.speed.speed + (this.data.speedChange.changPerSecond * totalTIme)

			let randomX = Random.Range(this.data.bounds.minX, this.data.bounds.maxX)
			let newPos = new Vector3(randomX, this.data.bounds.maxY, 0)

			this.data.position.position = newPos;

			console.log("enenmy initialized.Speed: " + newSpeed + " newPos: " + newPos)
		}

		OnEntityUpdate(): void {
			let localPosition = this.data.position.position
			localPosition.y -= this.data.speed.speed * game.Time.DeltaTime()

			this.data.position.position = localPosition

			if (localPosition.y <= this.data.bounds.minY) {
				this.world.destroyEntity(this.data.entity)
			}
		}

	}
}