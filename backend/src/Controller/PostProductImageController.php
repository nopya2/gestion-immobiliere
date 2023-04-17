<?php

namespace App\Controller;

use App\Entity\Image;
use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\File\File;

class PostProductImageController extends AbstractController
{

    public function __invoke(Request $request, ProductRepository $productRepos)
    {
        $id = $request->attributes->get('id');
        $product = $productRepos->find($id);
        if (!($product instanceof Product)) {
            throw new \RuntimeException('Produit non trouvé!');
        }

        $fileData = $request->files->get('image');
        $file = $fileData['file'];

        // dd($file->guessExtension());

        //On cree une image
        $image = new Image();
        $image->setFile($file);
        $image->setSize(intval($file->getSize()));
        $image->setFilename($file->getClientOriginalName());
        $image->setExtension($file->guessExtension());
        

        $product->addImage($image);
        $product->setUpdatedAt(new \DateTimeImmutable());

        return $product;
    }
}