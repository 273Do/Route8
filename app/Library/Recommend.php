<?php

namespace App\Library;

use Illuminate\Support\Facades\Facade;

class Recommend extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'recommend';
    }

    public function recommend($baseMapUrl, $otherMapUrls, $thresholdDistanceKm)
    {
        // echo "実行できた";
        list($baseLat, $baseLon) = $this->extractLocationFromUrl($baseMapUrl);

        $distances = [];
        foreach ($otherMapUrls as $mapUrl) {
            list($targetLat, $targetLon) = $this->extractLocationFromUrl($mapUrl);
            $distance = $this->calculateDistance($baseLat, $baseLon, $targetLat, $targetLon);

            if ($distance <= $thresholdDistanceKm * 1) {
                //  echo "++++++++++++";
                //  echo $distance;
                $distances[] = ['url' => $mapUrl, 'distance' => $distance];
            }
        }

        if (empty($distances)) {
            return null; // No maps within the threshold distance
        }

        // Sort by distance
        // usort($distances, function ($a, $b) {
        //     // echo "///////";
        //     // echo $a['distance'] - $b['distance'];
        //     // echo "\n";
        //     return $a['distance'] - $b['distance'];
        // });
        
        // 距離が近い順に並び替え
        $distancesArray = array_column($distances, 'distance');
        array_multisort($distancesArray, SORT_ASC, $distances);
        
        //   foreach($distances as $disMap){
        // echo $disMap["url"];
        //  echo "\n";
        //  echo $disMap["distance"];
        //  echo "\n";
        //  }

        // Select the closest map
        // $closestMap = $distances[2]['url'];
        // $closestMaps = [];
    foreach ($distances as $distance) {
       $closestMaps[] = $distance['url'];
    }

        return $closestMaps;
    }

    protected function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {   
        $R = 6378.137; // Earth radius in kilometers

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $distance = $R * $c; // Distance in kilometers

        return $distance;
    }

    protected function extractLocationFromUrl($mapUrl)
    {
    // Extract and return the location (latitude, longitude) from the map URL
    // This part depends on the specific structure of your map URLs
    // Example: parse the latitude and longitude from the URL

    // Extracting latitude and longitude from the "pb" parameter
    preg_match('/!2d([\d.]+)!3d([\d.]+)/', $mapUrl, $matches);

    if (count($matches) >= 3) {
        // Latitude and longitude found in the matches
        $latitude = floatval($matches[1]);
        $longitude = floatval($matches[2]);

        // echo $latitude . "あんど" . $longitude."end";

        return [$latitude, $longitude];
    } else {
        // Latitude and/or longitude not found, handle this case accordingly
        // echo "Latitude and/or longitude not found in the URL.";

        return [0.0, 0.0];
    }
}
   
}