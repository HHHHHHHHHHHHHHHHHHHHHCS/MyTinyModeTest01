
namespace game {

	/** 创建敌人的系统 */
	export class SpawnEnemySystem extends ut.ComponentSystem {

		OnUpdate(): void {
			this.world.forEach([EnemySpawner], (spawner) => {
				if (spawner.isPaused) {
					return
				}

				let timer = spawner.timer
				let delay = spawner.delay

				timer -= Time.DeltaTime()

				if (timer <= 0) {
					timer += delay
					ut.EntityGroup.instantiate(this.world, spawner.spawnGroup)
				}

				spawner.timer = timer
			})
		}
	}
}
