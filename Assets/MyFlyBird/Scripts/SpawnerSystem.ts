/// <reference path="RepeatingBackgroundSystem.ts"/>
namespace game {

	@ut.executeAfter(ut.Shared.UserCodeStart)
	@ut.executeBefore(ut.Shared.UserCodeEnd)
	@ut.executeAfter(RepeatingBackgroundSystem)
	@ut.requiredComponents(game.PipeSpawner)
	/** 生产敌人的系统 */
	export class SpawnerSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			let spawnCount = -1;//生产几个
			var pipeSpawner: PipeSpawner;

			this.world.forEach([game.PipeSpawner],
				(spawner) => {
					if (spawner.paused) {
						return;
					}
					pipeSpawner = spawner;

					let time = spawner.time;
					let delay = spawner.delay;

					time += this.scheduler.deltaTime();

					if (time > delay) {
						time -= delay;
						spawnCount += 1;
					}

					spawner.time = time;
				});


			for (let i = 0; i < spawnCount; i++) {
				var spawner = pipeSpawner;
				let instance = ut.EntityGroup.instantiate(this.world, `game.Pipes`)[0];
				let pipe = ut.Core2D.TransformService.getChild(this.world, instance, 0);
				let transform = new ut.Core2D.TransformLocalPosition(
					new Vector3(spawner.distance
						, Math.random() * spawner.maxHeight + spawner.minHeight
						, 0));
				if (this.world.hasComponent(pipe, ut.Core2D.TransformLocalPosition)) {
					this.world.setComponentData(pipe, transform);
				}
				else {
					this.world.addComponentData(pipe, transform);
				}
			}
		}

	}
}