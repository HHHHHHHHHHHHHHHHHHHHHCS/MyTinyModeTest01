
namespace game {

	//输入检测用
	@ut.executeAfter(ut.Shared.InputFence)
	export class InputSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			//return;
			//好像不支持input.anyKeyDown
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.W)) {
				this.MovePos(new Vector3(0, 1, 0))
			}
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.S)) {
				this.MovePos(new Vector3(0, -1, 0))
			}
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.A)) {
				this.MovePos(new Vector3(-1, 0, 0))
			}
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.D)) {
				this.MovePos(new Vector3(1, 0, 0))
			}
			if (ut.Runtime.Input.getMouseButtonDown(0)) {
				console.log("mouse input 0 ")
			}

		}

		private MovePos(dir: Vector3): void {
			dir.multiplyScalar(this.scheduler.deltaTime())
			this.world.forEach([ut.Entity, ut.Core2D.TransformLocalPosition], (entity, pos) => {
				if (!this.world.hasComponent(entity, ut.Core2D.Camera2D)) {
					pos.position = pos.position.add(dir)
				}
			})
		}
	}
}
