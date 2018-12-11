
namespace game {

	export class MoveBeFilter extends ut.EntityFilter {
		node: ut.Core2D.TransformNode;
		position?: ut.Core2D.TransformLocalPosition;
		rotation?: ut.Core2D.TransformLocalRotation;
		scale?: ut.Core2D.TransformLocalScale;
	}

	export class MoveBe extends ut.ComponentBehaviour {

		test: MoveBeFilter;

		OnEntityEnable(): void {
			return;
			console.log(this.world.getConfigData(GraConf).gra
				,this.world.getConfigData(GraConf).pi)
			console.log("MoveBe enabled")
			console.log(this.world.getEntityName(this.entity))
		}

	}
}
