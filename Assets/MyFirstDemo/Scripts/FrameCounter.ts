
namespace game {

	export class FrameCounterFilter extends ut.EntityFilter {
		entity: ut.Entity
		counter: game.Counter
	}

	export class FrameCounter extends ut.ComponentBehaviour {

		data: FrameCounterFilter

		OnEntityEnable(): void {
			return;
			console.log("FrameCounter enabled")
			this.data.counter.frame = 0
		}

		OnEntityUpdate(): void {
			return;
			let frame = this.data.counter.frame + 1
			this.data.counter.frame = frame
			console.log(`frame ${frame}`)
			if (frame == 5) {
				this.Disable(this.world, this.data.entity)
			}
		}

		OnEntityDisable(): void {
			return;
			console.log("FrameCounter disabled")
		}
	}
}
