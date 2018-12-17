using UTiny;
using UTiny.Core2D;
using UTiny.Math;
using UTiny.Shared;
using ut;
using UTiny.HTML;
using UTiny.Rendering;
using ut.EditorExtensions;
using UTiny.HitBox2D;
using UTiny.Physics2D;

/*
 * !!! TEMP UNITL PROPER SCENE FORMAT !!!
 */
namespace entities.game
{
    namespace EffectGroup
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace EnemyGroup
    {
        public struct Component : IComponentData
        {
        }
    }
    namespace MainGroup
    {
        public struct Component : IComponentData
        {
        }
    }
}

namespace game
{
    public struct Border : IComponentData
    {
        public float minX;
        public float maxX;
        public float minY;
        public float maxY;
    }
    public struct ChangeOverTime : IComponentData
    {
        public float changPerSecond;
    }
    public struct EnemeyTag : IComponentData
    {
    }
    public struct EnemySpawner : IComponentData
    {
        public float timer;
        public float delay;
        public bool isPaused;
        public string spawnGroup;
    }
    public struct MoveSpeed : IComponentData
    {
        public float speed;
    }
    public struct MoveWithInput : IComponentData
    {
    }
    public struct PlayerTag : IComponentData
    {
    }
    public struct ScrollingBg : IComponentData
    {
        public float speed;
        public float threshold;
        public float distance;
    }
}

namespace ut.Core2D
{
    namespace layers
    {
        public struct Default : IComponentData
        {
        }
        public struct TransparentFX : IComponentData
        {
        }
        public struct IgnoreRaycast : IComponentData
        {
        }
        public struct Water : IComponentData
        {
        }
        public struct UI : IComponentData
        {
        }
        public struct Grid : IComponentData
        {
        }
        public struct Cutscene : IComponentData
        {
        }
    }
}

namespace ut.Math
{
}

namespace ut
{
}

namespace ut.Shared
{
}

namespace ut.Core2D
{
}

namespace ut
{
}

namespace ut.HTML
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.HTML
{
}

namespace ut.Core2D
{
}

namespace ut.Rendering
{
}

namespace ut.Rendering
{
}

namespace ut.Core2D
{
}

namespace ut.EditorExtensions
{
    public struct AssetReferenceAnimationClip : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceAudioClip : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceSprite : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceSpriteAtlas : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTexture2D : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTile : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct AssetReferenceTMP_FontAsset : IComponentData
    {
        public string guid;
        public long fileId;
        public int type;
    }
    public struct CameraCullingMask : IComponentData
    {
        public int mask;
    }
    public struct EntityLayer : IComponentData
    {
        public int layer;
    }
}

namespace ut.HitBox2D
{
}

namespace ut.Physics2D
{
}
namespace game
{
    public struct EnemyBehavior_State : IComponentData
    {
        public bool initialized;
        public bool enabled;
        public bool onEnableCalled;
        public bool onDisableCalled;
    }
}
namespace game
{
    [UpdateAfter(typeof(UTiny.Shared.InputFence))]
    public class InputMovementSystemJS : IComponentSystem
    {
    }
}
namespace game
{
    public class PlayerCollisionSystemJS : IComponentSystem
    {
    }
}
namespace game
{
    public class ScrollingBgSystemJS : IComponentSystem
    {
    }
}
namespace game
{
    public class SpawnEnemySystemJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.UserCodeStart))]
    public class TimeJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.InputFence))]
    public class EnemyBehavior_OnEntityEnableJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.UserCodeEnd))]
    [UpdateAfter(typeof(UTiny.Shared.UserCodeStart))]
    public class EnemyBehavior_OnEntityUpdateJS : IComponentSystem
    {
    }
}
