namespace game {
	/** 类似Unity 的 Random */
	export class Random {
		
		/** 返回[min,max) */
		public static Range(min: number, max: number): number {
			return Math.random() * (max - min + 1) + min
		}
	}
}