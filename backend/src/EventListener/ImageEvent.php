<?php

// src/EventListener/SearchIndexer.php
namespace App\EventListener;

use Doctrine\Persistence\Event\LifecycleEventArgs;
use App\Entity\Image;

class ImageEvent
{
    public function __construct()
    {
        
    }

    // the listener methods receive an argument which gives you access to
    // both the entity object of the event and the entity manager itself
    public function postPersist(LifecycleEventArgs $args): void
    {
        
    }

    // the entity listener methods receive two arguments:
    // the entity instance and the lifecycle event
    public function postUpdate(Image $image, LifecycleEventArgs $event): void
    {
        $em = $event->getObjectManager();
        $em->flush();
    }

    public function preUdate(Image $image, LifecycleEventArgs $args): void
    {
        // if(!$image instanceof Image){
        //     return;
        // }

        // $url = $image->getUrl();
        
        // unlink($url);
    }


    public function preRemove(Image $image, LifecycleEventArgs $args): void
    {
        if(!$image instanceof Image){
            return;
        }

        $url = $image->getUrl();

        unlink($url);
    }


}