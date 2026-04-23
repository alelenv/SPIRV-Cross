#version 450
#extension GL_NV_gpu_shader5 : require

layout(binding = 0) uniform sampler2DArrayShadow uSampler;

layout(location = 0) in vec4 vUV;
layout(location = 1) in float vLod;
layout(location = 0) out float FragColor;

void main()
{
    FragColor = textureLod(uSampler, vec4(vUV.xyz, vUV.w), vLod);
}

