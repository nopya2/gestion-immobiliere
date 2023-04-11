<?php

namespace App\EventListener;

use ApiPlatform\Core\EventListener\DeserializeListener as DecoratedListener;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class DeserializeProductListener {

    private $decorated;
    private $serializerContextBuilderInterface;
    private $denormalizer;

    public function __construct(
        DecoratedListener $decorated,
        SerializerContextBuilderInterface $serializerContextBuilderInterface,
        DenormalizerInterface $denormalizer
    )
    {
        $this->decorated = $decorated;
        $this->serializerContextBuilderInterface = $serializerContextBuilderInterface;
        $this->denormalizer = $denormalizer;
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        if ($request->isMethodCacheable() || $request->isMethod(Request::METHOD_DELETE)) {
            return;
        }

        if($request->getContentType() === "form"){
            $this->denormalizeFromRequest($request);
        }else{
            $this->decorated->onKernelRequest($event);
        }
    }

    private function denormalizeFromRequest(Request $request): void
    {
        $attributes = RequestAttributesExtractor::extractAttributes($request);
        if(empty($attributes)){
            return;
        }

        $context = $this->serializerContextBuilderInterface->createFromRequest($request, false, $attributes);
        $data = $request->request->all();

        $data["commission"] = floatval($data["commission"]);
        for($i = 0; $i < count($data["prices"]); $i++){
            $data["prices"][$i]['amount'] = intval($data["prices"][$i]['amount']);
        }
        $data["lon"] = floatval($data["lon"]);
        $data["lat"] = floatval($data["lat"]);
        for($i = 0; $i < count($data["images"]); $i++){
            $data["images"][$i]['size'] = floatval($data["images"][$i]['size']);
        }

        $object = $this->denormalizer->denormalize(
            $data,
            $attributes['resource_class'],
            null,
            $context
        );

        // dd($object);

    }
}