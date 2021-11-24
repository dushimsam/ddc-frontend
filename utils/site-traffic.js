import publicIp from 'public-ip';
import DeviceDetector from "device-detector-js";

async function details() {
    const navigator = window.navigator
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(navigator.userAgent);

    const device_public_ip = await publicIp.v4();
    const location = "Rwanda"
    const os_type = device.os.name
    const browser_type = device.client.name
    const device_type = device.client.type
    const country = "Rwanda"
    const coordinates = "No cordinates"

    return { device_public_ip, device_type, location, os_type, browser_type, country, coordinates }
}

export {
    details
};