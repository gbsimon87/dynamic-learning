import * as THREE from "three";
import { badgePixelHeight, badgeWorldHeight, pickUnoverlapped } from "./labelLayout.js";
import { SOLAR_REGIONS } from "./solarRegionInfo.js";

/** Region badges share the planet badge style and leave space for its labels.
 * Invisible 44px tap targets make the smaller visual badges easy to select.
 */
export function createSolarRegionLabels({ scene, anchors, makeLabel, camera, getViewport, getBeltSettings, isVisible, getObstacles = () => [], onSelect }) {
    const object3d = new THREE.Group();
    object3d.name = "solar-region-labels";
    scene.add(object3d);
    const mainBeltAnchor = new THREE.Object3D();
    object3d.add(mainBeltAnchor);
    const owners = { ...anchors, "asteroid-belt": mainBeltAnchor };
    const targets = new Map();
    const hitMaterial = new THREE.SpriteMaterial({ visible: false, depthTest: false, depthWrite: false });
    const badges = SOLAR_REGIONS.map((entry) => {
        const label = makeLabel(entry.name);
        label.name = `${entry.id}-label`;
        const hitTarget = new THREE.Sprite(hitMaterial);
        hitTarget.name = `${entry.id}-label-hit`;
        object3d.add(label, hitTarget);
        targets.set(hitTarget, entry);
        return { entry, owner: owners[entry.id], label, hitTarget };
    });
    const point = new THREE.Vector3();

    function update() {
        camera.updateMatrixWorld();
        const { width, height } = getViewport();
        const pixels = badgePixelHeight(width);
        const belt = getBeltSettings();
        const radius = (belt.innerRadius + belt.outerRadius) / 2;
        // The far side stays in view in the initial overview, including phones.
        const angle = Math.PI * 0.95;
        mainBeltAnchor.position.set(radius * Math.sin(angle), belt.outerRadius * Math.sin(belt.maxInclinationDeg * Math.PI / 180), radius * Math.cos(angle));
        const boxes = [];
        for (const badge of badges) {
            const { owner, label, hitTarget } = badge;
            label.visible = hitTarget.visible = false;
            if (!isVisible()) continue;
            owner.getWorldPosition(label.position);
            const distance = camera.position.distanceTo(label.position);
            const worldHeight = badgeWorldHeight(pixels, distance, camera.fov, height);
            label.position.y += worldHeight * 0.75;
            label.scale.set(worldHeight * label.userData.aspect, worldHeight, 1);
            hitTarget.position.copy(label.position);
            hitTarget.scale.set(Math.max(label.scale.x, worldHeight * 44 / pixels), worldHeight * 44 / pixels, 1);
            point.copy(label.position).project(camera);
            const box = {
                badge, x: (point.x + 1) * width / 2, y: (1 - point.y) * height / 2,
                halfWidth: Math.max(pixels * label.userData.aspect, 44) / 2, halfHeight: 22,
            };
            if (point.z > -1 && point.z < 1 && box.x + box.halfWidth > 0 && box.x - box.halfWidth < width
                && box.y + box.halfHeight > 0 && box.y - box.halfHeight < height) boxes.push(box);
        }
        const obstacles = getObstacles();
        const kept = pickUnoverlapped([...obstacles, ...boxes]);
        boxes.forEach(({ badge }, index) => {
            badge.label.visible = badge.hitTarget.visible = kept[obstacles.length + index];
        });
    }

    return {
        hitTargets: badges.map(({ hitTarget }) => hitTarget),
        update,
        select(object) {
            const entry = targets.get(object);
            if (!entry || !object.visible) return false;
            onSelect(entry);
            return true;
        },
        dispose() {
            object3d.removeFromParent();
            targets.clear();
            for (const { label, hitTarget } of badges) {
                label.visible = hitTarget.visible = false;
                label.material.map?.dispose();
                label.material.dispose();
            }
            hitMaterial.dispose();
        },
    };
}
