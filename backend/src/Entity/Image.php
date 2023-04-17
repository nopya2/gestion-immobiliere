<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ImageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


/**
 * @ORM\Entity(repositoryClass=ImageRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"= {"read:image"}},
 *     denormalizationContext={"groups"= {"write:image"}},
 *     attributes= {
 *         "pagination_client_enabled"= true,
 *         "pagination_client_items_per_page"= true
 *     }
 * )
 * @ORM\HasLifecycleCallbacks()
 * @Vich\Uploadable()
 * 
 **/
class Image
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({
     *   "read:etablishment", "write:etablishment",
     *   "read:product"
     * })
     */
    private $id;

    /**
     * @ORM\Column(type="string", length= 255, nullable=true)
     * @Groups({
     *         "read:etablishment", "write:etablishment",
     *         "read:product"
     * })
     * */
    private $filename;

    /**
     * @ORM\Column(type="string", length= 255, nullable=true)
     * @Groups({
     *   "read:etablishment", "write:etablishment",
     *   "read:product"
     * })
     */
    
    private $extension;
    
    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({
     *   "read:etablishment", "write:etablishment",
     *   "read:product"
     * })
     */
    private $size;

    /**
     * @ORM\Column(type="string", length= 255, nullable=true)
     * @Groups({"read:etablishment", "write:etablishment",
     *   "read:product"
     * })
     */
    private $filePath;
    
    /**
     * @var File|null
     * @Vich\UploadableField(mapping="product_image", fileNameProperty="filePath")
     */
    private $file;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilename(): ?string
    {
        return $this->filename;
    }

    public function setFilename(string $filename): self
    {
        $this->filename = $filename;

        return $this;
    }

    public function getExtension(): ?string
    {
        return $this->extension;
    }

    public function setExtension(string $extension): self
    {
        $this->extension = $extension;

        return $this;
    }

    public function getSize(): ?float
    {
        return $this->size;
    }

    public function setSize(float $size): self
    {
        $this->size = $size;

        return $this;
    }

    /**
     * @return File|null
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * @param File|null $file
     */
    public function setFile(?File $file)
    {
        $this->file = $file;
        return $this;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }
}
