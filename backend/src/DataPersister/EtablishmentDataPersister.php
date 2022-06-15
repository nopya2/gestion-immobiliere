<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

use App\Entity\Etablishment;
use App\Service\ImageOptimizer;

final class EtablishmentDataPersister implements ContextAwareDataPersisterInterface
{
    private $em;
    private $imageOptimizer;
    private $_request;

    public function __construct(
        EntityManagerInterface $em,
        ImageOptimizer $imageOptimizer,
        RequestStack $request)
    {
        $this->em = $em;
        $this->imageOptimizer = $imageOptimizer;
        $this->_request = $request->getCurrentRequest();
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Etablishment;
    }

    /**
     * @param Etablishment $data
     */
    public function persist($data, array $context = [])
    {
        //Start transform base64 to image
        if($data->getLogo()->getUrl() !== null){
            $arr = explode(',', $data->getLogo()->getUrl());
            if(count($arr) > 1){
                $base64 = $arr[1];
    
                $bin = base64_decode($base64);
                // $size = getimagesizefromstring($bin);
                $img = imagecreatefromstring($bin);
        
                if(!$img){
                    die('Base64 value is not a valid image');
                }
                
                if($data->getLogo()->getId()){
                    $imgFile = $this->_request->toArray()['logo']['oldUrl'];
                    // dd($imgFile);
                }else{
                    $imgFile = 'uploads/images/etablishments/'.uniqid().'.png';
                }
                imagepng($img, $imgFile, 0);

                $data->getLogo()->setUrl($imgFile);

                //Compression de l'image
                $this->imageOptimizer->resize($data->getLogo()->getUrl());
            }

        }
        //End transform base64 to image

        // call your persistence layer to save $data
        $this->em->persist($data);
        $this->em->flush();
        return $data;
    }

    public function remove($data, array $context = [])
    {
        // call your persistence layer to delete $data
        $this->em->remove($data);
        $this->em->flush();
    }
}