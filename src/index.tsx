import {
  extend,
  Node,
  MeshPhongMaterialProps,
  MeshPhysicalMaterialProps,
  MeshToonMaterialProps,
  MeshBasicMaterialProps,
  MeshLambertMaterialProps,
  MeshStandardMaterialProps,
} from '@react-three/fiber'
import React, { useMemo, useImperativeHandle } from 'react'
import {
  DepthProps,
  ColorProps,
  LayerMaterialProps,
  NoiseProps,
  FresnelProps,
  GradientProps,
  MatcapProps,
  TextureProps,
  DisplaceProps,
  NormalProps,
} from './types'
import * as LAYERS from './vanilla'
import DebugLayerMaterial from './debug'
import { getLayerMaterialArgs } from './utils/Functions'
import { ColorRepresentation } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      layerMaterial: Node<LAYERS.LayerMaterial, typeof LAYERS.LayerMaterial>
      debuglayerMaterial: Node<typeof DebugLayerMaterial, typeof DebugLayerMaterial>
      depth_: Node<LAYERS.Depth, typeof LAYERS.Depth>
      color_: Node<LAYERS.Color, typeof LAYERS.Color>
      noise_: Node<LAYERS.Noise, typeof LAYERS.Noise>
      fresnel_: Node<LAYERS.Fresnel, typeof LAYERS.Fresnel>
      gradient_: Node<LAYERS.Gradient, typeof LAYERS.Gradient>
      matcap_: Node<LAYERS.Matcap, typeof LAYERS.Matcap>
      texture_: Node<LAYERS.Texture, typeof LAYERS.Texture>
      displace_: Node<LAYERS.Displace, typeof LAYERS.Displace>
      normal_: Node<LAYERS.Normal, typeof LAYERS.Normal>
    }
  }
}

extend({
  LayerMaterial: LAYERS.LayerMaterial,
  Depth_: LAYERS.Depth,
  Color_: LAYERS.Color,
  Noise_: LAYERS.Noise,
  Fresnel_: LAYERS.Fresnel,
  Gradient_: LAYERS.Gradient,
  Matcap_: LAYERS.Matcap,
  Texture_: LAYERS.Texture,
  Displace_: LAYERS.Displace,
  Normal_: LAYERS.Normal,
})

type AllMaterialProps = MeshPhongMaterialProps & //
  MeshPhysicalMaterialProps &
  MeshToonMaterialProps &
  MeshBasicMaterialProps &
  MeshLambertMaterialProps &
  MeshStandardMaterialProps

const LayerMaterial = React.forwardRef<
  LAYERS.LayerMaterial,
  React.PropsWithChildren<LayerMaterialProps & Omit<AllMaterialProps, 'color'>>
>(({ children, ...props }, forwardRef) => {
  const ref = React.useRef<LAYERS.LayerMaterial>(null!)
  useImperativeHandle(forwardRef, () => ref.current)

  React.useLayoutEffect(() => {
    ref.current.layers = (ref.current as any).__r3f.objects
    ref.current.refresh()
  }, [children])

  const [args, otherProps] = useMemo(() => getLayerMaterialArgs(props), [props])

  return (
    <layerMaterial args={[args]} ref={ref} {...otherProps}>
      {children}
    </layerMaterial>
  )
})

function getNonUniformArgs(props: any) {
  return [
    {
      mode: props?.mode,
      visible: props?.visible,
      type: props?.type,
      mapping: props?.mapping,
      map: props?.map,
      axes: props?.axes,
    },
  ] as any
}

const Depth = React.forwardRef<LAYERS.Depth, DepthProps>((props, forwardRef) => {
  //@ts-ignore
  return <depth_ args={getNonUniformArgs(props)} ref={forwardRef} {...props} />
}) as React.ForwardRefExoticComponent<DepthProps & React.RefAttributes<LAYERS.Depth>>

const Color = React.forwardRef<LAYERS.Color, ColorProps>((props, ref) => {
  //@ts-ignore
  return <color_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<ColorProps & React.RefAttributes<LAYERS.Color>>

const Noise = React.forwardRef<LAYERS.Noise, NoiseProps>((props, ref) => {
  //@ts-ignore
  return <noise_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<NoiseProps & React.RefAttributes<LAYERS.Noise>>

const Fresnel = React.forwardRef<LAYERS.Fresnel, FresnelProps>((props, ref) => {
  //@ts-ignore
  return <fresnel_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<FresnelProps & React.RefAttributes<LAYERS.Fresnel>>

const Gradient = React.forwardRef<LAYERS.Gradient, GradientProps>((props, ref) => {
  //@ts-ignore
  return <gradient_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<GradientProps & React.RefAttributes<LAYERS.Gradient>>

const Matcap = React.forwardRef<LAYERS.Matcap, MatcapProps>((props, ref) => {
  //@ts-ignore
  return <matcap_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<MatcapProps & React.RefAttributes<LAYERS.Matcap>>

const Texture = React.forwardRef<LAYERS.Texture, TextureProps>((props, ref) => {
  //@ts-ignore
  return <texture_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<TextureProps & React.RefAttributes<LAYERS.Texture>>

const Displace = React.forwardRef<LAYERS.Displace, DisplaceProps>((props, ref) => {
  //@ts-ignore
  return <displace_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<DisplaceProps & React.RefAttributes<LAYERS.Displace>>

const Normal = React.forwardRef<LAYERS.Normal, NormalProps>((props, ref) => {
  //@ts-ignore
  return <normal_ ref={ref} args={getNonUniformArgs(props)} {...props} />
}) as React.ForwardRefExoticComponent<NormalProps & React.RefAttributes<LAYERS.Normal>>

export { DebugLayerMaterial, LayerMaterial, Depth, Color, Noise, Fresnel, Gradient, Matcap, Texture, Displace, Normal }
