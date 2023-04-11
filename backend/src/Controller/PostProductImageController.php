<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

class PostProductImageController extends AbstractController
{

    public function __invoke(Request $request, ProductRepository $productRepos)
    {
        $id = $request->attributes->get('id');
        $product = $productRepos->find($id);
        if (!($product instanceof Product)) {
            throw new \RuntimeException('Produit non trouvé!');
        }
        $files = $request->files->get('images');

        dd($files);

        // dd($files, $product);
    }
}