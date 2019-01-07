namespace game {

	@ut.executeBefore(ut.Shared.RenderingFence)
	@ut.requiredComponents(game.NumberTextRenderer)
	@ut.optionalComponents(ut.Core2D.Sprite2DRenderer, ut.Core2D.TransformLocalPosition)
	/** 
	 * 数字组件系统
	 * 用于显示分数
	 */
	export class NumberTextRenderingSystem extends ut.ComponentSystem {
		OnUpdate(): void {
			this.world.forEach([game.NumberTextRenderer]
				, (numberTextRenderer) => {
					let value = numberTextRenderer.value
					let spacing = numberTextRenderer.spacing
					let alignment = numberTextRenderer.alignment
					let renderers = numberTextRenderer.renderers
					let characters = numberTextRenderer.characters

					let digits = [
						value % 10,
						Math.floor(value / 10),
						Math.floor(value / 100),
						Math.floor(value / 1000)
					]

					let count = renderers.length
					//开头是0就别显示
					for (let i = renderers.length - 1; i >= 1; i--) {
						if (digits[i] != 0) {
							break
						}
						count = i
					}

					let width = count * spacing //间距

					for (let i = 0; i < renderers.length; i++) {
						let renderer = renderers[i]
						//得到数据
						let spriteRenderer = this.world.getComponentData(renderer, ut.Core2D.Sprite2DRenderer)
						let color = spriteRenderer.color

						if (i < count) {
							color.a = 1;
							spriteRenderer.sprite = characters[digits[i]]

							let position

							if (alignment == game.TextAligment.Center) {
								//从中间散开字
								position = new Vector3(spacing * (count - i - 1) - (width - spacing) * 0.5, 0, 0)
							} else {
								//从做到右排序
								position = new Vector3(spacing * -i, 0, 0)
							}
							//设置数据
							this.world.setComponentData(renderer, new ut.Core2D.TransformLocalPosition(position))
						} else {
							//如果不是用就隐藏
							color.a = 0
						}

						spriteRenderer.color = color
						this.world.setComponentData(renderer, spriteRenderer)
					}
				})
		}
	}
}