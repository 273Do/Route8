<?php
namespace App\Library;
use Illuminate\Support\Facades\Facade;
class Recommend extends Facade {
    protected static function getFacadeAccessor() {
        return 'recommend';
    }
    // 引数はベースとなるMapURL，他の全てのURLが格納された配列，閾値(範囲選択)
    public function recommend($baseMapUrl, $otherMapUrls, $thresholdDistanceKm) {
        // URLを解析して緯度と経度を格納
        list($baseLat, $baseLon) = $this->extractLocationFromUrl($baseMapUrl);
        $distances = [];
        foreach ($otherMapUrls as $mapUrl) {
            list($targetLat, $targetLon) = $this->extractLocationFromUrl($mapUrl);
            $distance = $this->calculateDistance($baseLat, $baseLon, $targetLat, $targetLon);
            // 指定の範囲内であれば配列にデータを格納
            if ($distance <= $thresholdDistanceKm * 1) {
                $distances[] = ['url' => $mapUrl, 'distance' => $distance];
            }
        }
        //該当するmapがなければ空を返す
        if (empty($distances)) {
            return null;
        }
        // 距離が近い順に並び替える
        $distancesArray = array_column($distances, 'distance');
        array_multisort($distancesArray, SORT_ASC, $distances);
        foreach ($distances as $distance) {
            $closestMaps[] = $distance['url'];
        }
        return $closestMaps;
    }
    // 2つの座標の距離を計算する関数(Haversine formula)
    protected function calculateDistance($lat1, $lon1, $lat2, $lon2) {
        $R = 6378.137; // 地球の半径(キロメートル)
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $R * $c; // キロメートル単位
        return $distance;
    }
    // URLから緯度・経度を抽出する関数
    protected function extractLocationFromUrl($mapUrl) {
        preg_match('/!2d([\d.]+)!3d([\d.]+)/', $mapUrl, $matches);
        if (count($matches) >= 3) {
            $latitude = floatval($matches[1]);
            $longitude = floatval($matches[2]);
            return [$latitude, $longitude];
        } else {
            return [0.0, 0.0];
        }
    }
}
