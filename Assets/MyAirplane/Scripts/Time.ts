
namespace game {

	/** 类似Unity 的Time API */
	@ut.executeBefore(ut.Shared.UserCodeStart)
	export class Time extends ut.ComponentSystem {
		private static _deltaTime: number = 0;
		private static _time: number = 0;

		public static DeltaTime(): number {
			return Time._deltaTime;
		}

		public static Time(): number {
			return Time._time;
		}

		public static Reset() {
			Time._time = 0;
		}

		OnUpdate(): void {
			let dt = this.scheduler.deltaTime();
			Time._deltaTime = dt;
			Time._time += dt;
		}
	}
}
