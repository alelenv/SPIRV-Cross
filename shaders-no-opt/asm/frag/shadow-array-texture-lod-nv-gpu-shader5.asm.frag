; SPIR-V
; Version: 1.0
; Schema: 0
; Regression test for bug 6060394:
; GL_NV_gpu_shader5 allows non-constant Lod on sampler2DArrayShadow. Prior to the fix,
; SPIRV-Cross threw "textureLod on sampler2DArrayShadow is not constant 0.0. This cannot be
; expressed in GLSL." when the Lod operand was not OpConstantNull. Expected output now emits
; `textureLod` directly and requires GL_NV_gpu_shader5.
               OpCapability Shader
          %1 = OpExtInstImport "GLSL.std.450"
               OpMemoryModel Logical GLSL450
               OpEntryPoint Fragment %main "main" %vUV %vLod %FragColor
               OpExecutionMode %main OriginUpperLeft
               OpSource GLSL 450
               OpName %main "main"
               OpName %uSampler "uSampler"
               OpName %vUV "vUV"
               OpName %vLod "vLod"
               OpName %FragColor "FragColor"
               OpDecorate %uSampler DescriptorSet 0
               OpDecorate %uSampler Binding 0
               OpDecorate %vUV Location 0
               OpDecorate %vLod Location 1
               OpDecorate %FragColor Location 0
       %void = OpTypeVoid
          %3 = OpTypeFunction %void
      %float = OpTypeFloat 32
    %v4float = OpTypeVector %float 4
     %img_t  = OpTypeImage %float 2D 1 1 0 1 Unknown
    %samp_t  = OpTypeSampledImage %img_t
%_ptr_UCSamp = OpTypePointer UniformConstant %samp_t
   %uSampler = OpVariable %_ptr_UCSamp UniformConstant
%_ptr_Input_v4f = OpTypePointer Input %v4float
%_ptr_Input_f  = OpTypePointer Input %float
%_ptr_Output_f = OpTypePointer Output %float
        %vUV = OpVariable %_ptr_Input_v4f Input
       %vLod = OpVariable %_ptr_Input_f  Input
  %FragColor = OpVariable %_ptr_Output_f Output
       %main = OpFunction %void None %3
          %5 = OpLabel
          %c = OpLoad %v4float %vUV
          %s = OpLoad %samp_t %uSampler
          %d = OpCompositeExtract %float %c 3
          %l = OpLoad %float %vLod
          %r = OpImageSampleDrefExplicitLod %float %s %c %d Lod %l
               OpStore %FragColor %r
               OpReturn
               OpFunctionEnd
