import { SerialPort } from 'serialport';

async function listPorts() {
    try {
        const ports = await SerialPort.list();
        console.log('Available Ports:');
        ports.forEach(port => {
            console.log('--------------------------------------------------');
            console.log(`Path: ${port.path}`);
            console.log(`Manufacturer: ${port.manufacturer}`);
            console.log(`Serial Number: ${port.serialNumber}`);
            console.log(`PnP ID: ${port.pnpId}`);
            console.log(`Location ID: ${port.locationId}`);
            console.log(`Vendor ID: ${port.vendorId}`);
            console.log(`Product ID: ${port.productId}`);
        });
        if (ports.length === 0) {
            console.log('No ports found.');
        }
    } catch (err) {
        console.error('Error listing ports:', err);
    }
}

listPorts();
