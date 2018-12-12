
namespace game {
	export class PlayerMoveFilter extends ut.EntityFilter {
		pos: ut.Core2D.TransformLocalPosition
		input: MoveWithInput
		border: Border
		speed: MoveSpeed
	}


	/**
	 * 飞机的移动
	 */
	@ut.executeAfter(ut.Shared.InputFence)
	export class InputMovementSystem extends ut.ComponentSystem {

		isAwake: boolean = true
		cameraEntity: ut.Entity
		cameraSize: Vector2

		filter: PlayerMoveFilter = new PlayerMoveFilter()

		OnUpdate(): void {
			if (this.isAwake) {
				this.isAwake = false

				if (ut.Core2D.Input.isTouchSupported()) {
					console.log("isTouchSupported():" + ut.Core2D.Input.isTouchSupported())
				}
			}

			let dt = Time.DeltaTime()

			this.filter.ForEach(this.world, (entity) => {
				let data = this.filter

				let pos = data.pos.position
				let moveSpeed = data.speed.speed * dt
				var dir
				if (ut.Core2D.Input.isTouchSupported()) {
					dir = this.ProcessTouchInput(entity)
				}
				else {
					dir = this.ProcessKeyboardInput()
				}


				pos = pos.add(dir.multiplyScalar(moveSpeed))

				pos.x = Math.max(data.border.minX, Math.min(data.border.maxX, pos.x))
				pos.y = Math.max(data.border.minY, Math.min(data.border.maxY, pos.y))

				data.pos.position = pos
			});
		}

		ProcessTouchInput(entity: ut.Entity): Vector3 {
			if (this.cameraEntity == null) {
				this.cameraEntity = this.world.getEntityByName("Camera")
				let config = this.world.getConfigData(ut.Core2D.DisplayInfo)
				this.cameraSize = new Vector2(config.width, config.height)
			}

			let dir = new Vector3();
			if (ut.Core2D.Input.touchCount() > 0) {
				let touch: ut.Core2D.Touch = ut.Core2D.Input.getTouch(0)
				let worldPos = ut.Core2D.TransformService.computeWorldPosition(this.world, entity)
				let transPos = ut.Core2D.TransformService.worldToWindow(this.world, this.cameraEntity, worldPos, this.cameraSize)

				if (touch.x > transPos.x) {
					dir.x += 1
				}
				else if (touch.x < transPos.x) {
					dir.x -= 1
				}

				if (touch.y > transPos.y) {
					dir.y += 1
				} else if (touch.y < transPos.y) {
					dir.y -= 1
				}

				if (touch.phase == ut.Core2D.TouchState.Moved) {
					//console.log("moved: " + ut.Core2D.Input.touchCount());
				}
				else if (touch.phase == ut.Core2D.TouchState.Ended) {
					//console.log("ended: " + ut.Core2D.Input.touchCount());
				}
				else if (touch.phase == ut.Core2D.TouchState.Stationary) {
					//console.log("holding: " + ut.Core2D.Input.touchCount());
				}
				else if (touch.phase == ut.Core2D.TouchState.Canceled) {
					//console.log("cancelled: " + ut.Core2D.Input.touchCount());
				}
				else if (touch.phase == ut.Core2D.TouchState.Began) {
					//console.log("began: " + ut.Core2D.Input.touchCount());
				}
				else {
					console.log("NO TOUCH STATE!!!");
				}
			}



			return dir
		}

		ProcessKeyboardInput(): Vector3 {
			let dir = new Vector3();
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.W)) {
				dir.y += 1;
			}
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.S)) {
				dir.y -= 1;
			}
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.A)) {
				dir.x -= 1;
			}
			if (ut.Runtime.Input.getKey(ut.Core2D.KeyCode.D)) {
				dir.x += 1;
			}
			return dir
		}


	}
}
