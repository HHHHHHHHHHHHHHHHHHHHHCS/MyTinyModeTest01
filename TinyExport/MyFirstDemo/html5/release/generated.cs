using UTiny;
using UTiny.Core2D;
using UTiny.Math;
using UTiny.Shared;
using ut;
using UTiny.HTML;
using UTiny.Rendering;
using ut.EditorExtensions;

/*
 * !!! TEMP UNITL PROPER SCENE FORMAT !!!
 */
namespace entities.game
{
    namespace Main
    {
        public struct Component : IComponentData
        {
        }
    }
}

namespace game
{
    public struct Counter : IComponentData
    {
        public int frame;
    }
    public struct Movement : IComponentData
    {
        public Vector2 speed;
    }
    public struct SpeedBoost : IComponentData
    {
        public float multiplier;
    }
    public struct Thing : IComponentData
    {
        public int radius;
        public float time;
        public float speed;
    }
    [Configuration]
    public struct GraConf : IComponentData
    {
        public float gra;
        public float pi;
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
namespace game
{
    public struct FrameCounter_State : IComponentData
    {
        public bool initialized;
        public bool enabled;
        public bool onEnableCalled;
        public bool onDisableCalled;
    }
}
namespace game
{
    public struct MoveBe_State : IComponentData
    {
        public bool initialized;
        public bool enabled;
        public bool onEnableCalled;
        public bool onDisableCalled;
    }
}
namespace game
{
    public class CircleMovementJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateAfter(typeof(UTiny.Shared.InputFence))]
    public class InputSystemJS : IComponentSystem
    {
    }
}
namespace game
{
    public class LogPositionJS : IComponentSystem
    {
    }
}
namespace game
{
    public class MovementSystemJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.InputFence))]
    public class FrameCounter_OnEntityEnableJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.UserCodeEnd))]
    [UpdateAfter(typeof(UTiny.Shared.UserCodeStart))]
    public class FrameCounter_OnEntityUpdateJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateAfter(typeof(UTiny.Shared.PlatformRenderingFence))]
    public class FrameCounter_OnEntityDisableJS : IComponentSystem
    {
    }
}
namespace game
{
    [UpdateBefore(typeof(UTiny.Shared.InputFence))]
    public class MoveBe_OnEntityEnableJS : IComponentSystem
    {
    }
}
