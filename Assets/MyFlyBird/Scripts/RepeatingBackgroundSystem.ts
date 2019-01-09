/// <reference path="ScrollerSystem.ts" />
namespace game {

	@ut.executeAfter(game.ScrollerSystem)
	@ut.requiredComponents(ut.Core2D.TransformLocalPosition, game.RepeatingBackground)
	/** 循环背景 */
	export class RepeatingBackgroundSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			this.world.forEach([ut.Core2D.TransformLocalPosition, RepeatingBackground],
				(position, background) => {
					let pos = position.position

					if (pos.x < background.threshold) {
						pos.x += background.distance
					}

					position.position = pos
				})
		}

	}
}