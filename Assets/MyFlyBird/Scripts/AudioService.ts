namespace game {
	/** 声音管理器 */
	export class AudioService {
		public static PlayAudioSourceByName(world: ut.World, name: string) {
			let entity = world.getEntityByName(name)

			if (entity.isNone()) {
				console.warn("game.AudioService.PlayAudioSourceByName:" + name + "not find")
				return
			}

			AudioService.PlayAudioSource(world, entity)
		}

		public static PlayAudioSource(world: ut.World, entity: ut.Entity) {
			if (!world.hasComponent(entity, ut.Audio.AudioSource)) {
				console.warn("game.AudioService.PlayAudioSource: don't find AudioSource Component")
				return
			}

			if (!world.hasComponent(entity, ut.Audio.AudioSourceStart)) {
				world.addComponent(entity, ut.Audio.AudioSourceStart)
			}
		}
	}
}