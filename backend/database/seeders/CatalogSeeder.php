<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        $categories = collect([
            'CCTV & Cameras', 'Fire Alarm Systems', 'Access Control', 'Time Attendance', 'PABX & Communication', 'Networking', 'Smart Locks',
        ])->mapWithKeys(fn (string $name) => [$name => Category::updateOrCreate(['slug' => str($name)->slug()], ['name' => $name, 'status' => 'published'])]);

        $brands = collect(['CP PLUS', 'Hikvision', 'EZVIZ', 'Agni', 'Mantra', 'BLI Solutions'])->mapWithKeys(fn (string $name) => [$name => Brand::updateOrCreate(['slug' => str($name)->slug()], ['name' => $name, 'status' => 'published'])]);

        $products = [
            ['slug' => 'cp-plus-e39a-3mp-wi-fi-pt-camera', 'name' => 'CP PLUS E39A 3MP Wi-Fi PT Camera', 'brand' => 'CP PLUS', 'category' => 'CCTV & Cameras', 'model' => 'E39A', 'price_npr' => 4200, 'short_specs' => '3MP | Wi-Fi | Pan and tilt', 'description' => 'A compact indoor Wi-Fi PT camera for practical home and small-business monitoring.', 'features' => ['3MP image quality', 'Wi-Fi connectivity', 'Pan and tilt coverage', 'Indoor-ready design'], 'featured' => true],
            ['slug' => 'hikvision-2mp-ir-smart-light-audio-camera', 'name' => 'Hikvision 2MP IR Smart Light Audio Camera', 'brand' => 'Hikvision', 'category' => 'CCTV & Cameras', 'model' => '2MP IR Smart Light', 'price_npr' => 3250, 'short_specs' => '2MP | IR | Indoor and outdoor', 'description' => 'A dependable Hikvision camera for everyday indoor or outdoor surveillance coverage.', 'features' => ['2MP image quality', 'Infrared night vision', 'Smart light support', 'Audio support'], 'featured' => true],
            ['slug' => 'ezviz-h3c-2k-3mp-wi-fi-camera', 'name' => 'EZVIZ H3C 2K 3MP Wi-Fi Smart Home Camera', 'brand' => 'EZVIZ', 'category' => 'CCTV & Cameras', 'model' => 'H3C', 'price_npr' => 7200, 'short_specs' => '3MP | 2K | Wi-Fi smart home', 'description' => 'A smart Wi-Fi camera for users who want simple remote visibility around the home.', 'features' => ['2K resolution', '3MP image quality', 'Wi-Fi smart home setup', 'Outdoor-ready form factor'], 'featured' => true],
            ['slug' => 'agni-protection-8-zone-fire-alarm-panel', 'name' => 'Agni Protection 8 Zone Fire Alarm Panel', 'brand' => 'Agni', 'category' => 'Fire Alarm Systems', 'model' => '8 Zone Panel', 'price_npr' => 30000, 'short_specs' => 'Conventional | 8 zone | Fire alarm', 'description' => 'A conventional fire alarm control panel for organized zone-based safety systems.', 'features' => ['8 zone control', 'Conventional fire alarm format', 'Clear panel indicators', 'Suitable for planned installations'], 'featured' => true],
            ['slug' => 'mantra-mbio-g1-time-attendance-device', 'name' => 'Mantra mBio-G1 Time Attendance Biometric Device', 'brand' => 'Mantra', 'category' => 'Time Attendance', 'model' => 'mBio-G1', 'price_npr' => 9999, 'short_specs' => 'Fingerprint | RFID | TCP/IP', 'description' => 'A biometric attendance device for recording workforce entry and exit with a compact footprint.', 'features' => ['Fingerprint authentication', 'RFID support', 'TCP/IP connectivity', 'Workforce attendance use'], 'featured' => true],
        ];

        foreach ($products as $index => $data) {
            $record = $data;
            unset($record['brand'], $record['category']);

            Product::updateOrCreate(
                ['slug' => $data['slug']],
                array_merge($record, [
                    'brand_id' => $brands[$data['brand']]->id,
                    'category_id' => $categories[$data['category']]->id,
                    'status' => 'published',
                    'availability' => 'In stock',
                    'image_alt' => $data['name'],
                    'sort_order' => $index,
                    'published_at' => now(),
                ]),
            );
        }
    }
}
