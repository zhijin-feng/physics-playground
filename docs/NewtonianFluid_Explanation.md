# Newtonian Fluid Particle Simulation Model Explanation

## Model Overview

This simulation uses a simplified particle-based elastic restoration model to represent the dynamic behavior of fluid inside a cup when shaken by external forces. It is not a strict fluid dynamics calculation but an efficient and easy-to-implement physical approximation suitable for real-time web interactions.

---

## Physics Model Details

### 1. Particles

- The fluid is discretized into many particles, each representing a small portion of the liquid.
- Each particle has a position `(x, y)` and velocity `(vx, vy)`.
- Particles are initially arranged inside the cup.

### 2. Elastic Restoring Force

- Each particle has an "original position" `(originalX, originalY)`, representing its ideal resting location.
- Particles experience a spring-like force that pulls them back toward their original position.
- The magnitude of this restoring force is proportional to the distance between the current and original positions.
- The force can be approximated by:F_restitution = k * (originalPosition - currentPosition)， where `k` is the elasticity coefficient (e.g., 0.1).

### 3. External Acceleration

- Particles are affected by gravity, accelerating downward along the y-axis.
- Mouse dragging applies additional acceleration to all particles, simulating the fluid's inertia during shaking.

### 4. Friction

- To prevent particle velocities from growing indefinitely, friction is introduced.
- Velocity is multiplied by a factor less than 1 (e.g., 0.95) each frame, gradually slowing down the motion.

### 5. Boundary Constraints

- Particle positions are constrained within the cup boundaries to prevent particles from escaping.
- When particles hit the boundary, their positions are corrected back within valid limits.

---

## Advantages and Limitations

### Advantages

- Simple implementation with low computational cost, suitable for browser real-time rendering.
- Produces visually natural fluid shaking effects.
- Parameters (elasticity, gravity, friction) are easy to adjust for different dynamic behaviors.

### Limitations

- Does not simulate complex fluid dynamics phenomena such as viscosity or vortices.
- Cannot model non-Newtonian fluid behaviors.
- Physics accuracy is limited; the focus is on visual effect rather than strict realism.

---

## Summary

This model is a simplified mass-spring system particle simulation combining restoring force, gravity, and friction to mimic fluid shaking dynamics. It balances physical plausibility and computational performance, making it a practical solution for quick fluid visualization on web platforms.

---

If you want to learn about more advanced fluid dynamics models (e.g., numerical solutions to the Navier-Stokes equations), or if you wish to extend this model further, feel free to ask.


