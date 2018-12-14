namespace game {

	/** 移动背景 */
	export class ScrollingBgSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			let dt = Time.DeltaTime()

			this.world.forEach([ut.Core2D.TransformLocalPosition, ScrollingBg], (pos, scrolling) => {
				let localPos = pos.position

				localPos.y -= scrolling.speed * dt
				if (localPos.y < scrolling.threshold) {
					localPos.y += scrolling.distance
				}

				pos.position = localPos
			})
		}

	}
}