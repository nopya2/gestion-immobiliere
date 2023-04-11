<?php

namespace App\EventListener;

use ApiPlatform\Core\EventListener\DeserializeListener as DecoratedListener;
use ApiPlatform\Core\Util\RequestAttributesExtractor;
use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

class DeserializeListener {

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

        dd($data);

        $object = $this->denormalizer->denormalize(
            $data,
            $attributes['resource_class'],
            null,
            $context
        );

        dd($object);

    }
}