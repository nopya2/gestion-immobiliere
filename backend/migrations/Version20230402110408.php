<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230402110408 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_price (id INT AUTO_INCREMENT NOT NULL, operation_id INT NOT NULL, product_id INT NOT NULL, amount BIGINT NOT NULL, INDEX IDX_6B94598544AC3583 (operation_id), INDEX IDX_6B9459854584665A (product_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_price ADD CONSTRAINT FK_6B94598544AC3583 FOREIGN KEY (operation_id) REFERENCES operation_type (id)');
        $this->addSql('ALTER TABLE product_price ADD CONSTRAINT FK_6B9459854584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product ADD owner_id INT NOT NULL, ADD construction_type_id INT NOT NULL, ADD product_type_id INT NOT NULL, ADD operation_id INT NOT NULL, ADD name VARCHAR(255) NOT NULL, ADD reference VARCHAR(255) NOT NULL, ADD city VARCHAR(255) NOT NULL, ADD neighborhood VARCHAR(255) NOT NULL, ADD observation LONGTEXT NOT NULL, ADD commission DOUBLE PRECISION NOT NULL, ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD7E3C61F9 FOREIGN KEY (owner_id) REFERENCES owner (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD7A653FE7 FOREIGN KEY (construction_type_id) REFERENCES type_construction (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD14959723 FOREIGN KEY (product_type_id) REFERENCES type_produit (id)');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD44AC3583 FOREIGN KEY (operation_id) REFERENCES operation_type (id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD7E3C61F9 ON product (owner_id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD7A653FE7 ON product (construction_type_id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD14959723 ON product (product_type_id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD44AC3583 ON product (operation_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE product_price');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD7E3C61F9');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD7A653FE7');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD14959723');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD44AC3583');
        $this->addSql('DROP INDEX IDX_D34A04AD7E3C61F9 ON product');
        $this->addSql('DROP INDEX IDX_D34A04AD7A653FE7 ON product');
        $this->addSql('DROP INDEX IDX_D34A04AD14959723 ON product');
        $this->addSql('DROP INDEX IDX_D34A04AD44AC3583 ON product');
        $this->addSql('ALTER TABLE product DROP owner_id, DROP construction_type_id, DROP product_type_id, DROP operation_id, DROP name, DROP reference, DROP city, DROP neighborhood, DROP observation, DROP commission, DROP status');
    }
}
