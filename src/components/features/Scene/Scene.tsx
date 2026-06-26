import { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'
import styles from './Scene.module.scss'

type TOrbData = {
  speed: number
  offset: number
}

export const Scene: FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    const cleanup = () => {}

    if (!mount) return cleanup

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0008)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      4000,
    )
    camera.position.z = 1000

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const particleCount = isMobile ? 1800 : 4500
    const separation = isMobile ? 60 : 36
    const amountX = 140
    const amountY = 140

    // ---- Flowing particle wave field ----
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const palette = [
      new THREE.Color('#28f5be'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#22d3ee'),
    ]

    let ix = 0
    for (let i = 0; i < amountX; i += 1) {
      for (let j = 0; j < amountY; j += 1) {
        if (ix >= particleCount) break
        const x = i * separation - (amountX * separation) / 2
        const z = j * separation - (amountY * separation) / 2
        positions[ix * 3] = x
        positions[ix * 3 + 1] = 0
        positions[ix * 3 + 2] = z
        const c = palette[(i + j) % palette.length]
        colors[ix * 3] = c.r
        colors[ix * 3 + 1] = c.g
        colors[ix * 3 + 2] = c.b
        ix += 1
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // ---- Floating orbs (additive glow) ----
    const orbCount = isMobile ? 6 : 12
    const orbs: THREE.Mesh[] = []
    const orbsData: TOrbData[] = []
    const orbGroup = new THREE.Group()
    scene.add(orbGroup)

    for (let i = 0; i < orbCount; i += 1) {
      const orbGeo = new THREE.SphereGeometry(Math.random() * 28 + 14, 24, 24)
      const orbColor = palette[Math.floor(Math.random() * palette.length)]
      const orbMat = new THREE.MeshBasicMaterial({
        color: orbColor,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
      })
      const orb = new THREE.Mesh(orbGeo, orbMat)
      orb.position.set(
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1200 - 200,
      )
      orbsData.push({
        speed: Math.random() * 0.4 + 0.15,
        offset: Math.random() * Math.PI * 2,
      })
      orbs.push(orb)
      orbGroup.add(orb)
    }

    // ---- Mouse interaction ----
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMouseMove = (event: MouseEvent) => {
      mouse.tx = (event.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ---- Animation loop ----
    const clock = new THREE.Clock()
    let frameId = 0

    const renderWave = (time: number) => {
      const pos = geometry.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      let k = 0
      for (let i = 0; i < amountX; i += 1) {
        for (let j = 0; j < amountY; j += 1) {
          if (k >= particleCount) break
          arr[k * 3 + 1] =
            Math.sin((i + time) * 0.3) * 60 +
            Math.sin((j + time) * 0.5) * 60 +
            Math.sin((i + j + time) * 0.2) * 40
          k += 1
        }
      }
      pos.needsUpdate = true
    }

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const time = clock.getElapsedTime()

      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      if (!prefersReduced) {
        renderWave(time * 0.9)
      }

      particles.rotation.z = time * 0.02
      particles.rotation.x = mouse.y * 0.12
      particles.rotation.y = mouse.x * 0.12

      orbGroup.rotation.y = time * 0.03
      orbGroup.rotation.x = time * 0.015
      orbs.forEach((orb, idx) => {
        const data = orbsData[idx]
        /* eslint-disable no-param-reassign */
        orb.position.y += Math.sin(time * data.speed + data.offset) * 0.6
        orb.position.x += Math.cos(time * data.speed * 0.8) * 0.4
        /* eslint-enable no-param-reassign */
      })

      camera.position.x += (mouse.x * 120 - camera.position.x) * 0.04
      camera.position.y += (-mouse.y * 120 - camera.position.y) * 0.04
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      orbs.forEach((o) => {
        o.geometry.dispose()
        ;(o.material as THREE.Material).dispose()
      })
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div className={styles.scene} ref={mountRef} aria-hidden="true" />
}
