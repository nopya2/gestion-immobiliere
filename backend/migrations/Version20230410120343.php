<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230410120343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE product_operation_type (product_id INT NOT NULL, operation_type_id INT NOT NULL, INDEX IDX_F0C774944584665A (product_id), INDEX IDX_F0C77494668D0C5E (operation_type_id), PRIMARY KEY(product_id, operation_type_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_operation_type ADD CONSTRAINT FK_F0C774944584665A FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product_operation_type ADD CONSTRAINT FK_F0C77494668D0C5E FOREIGN KEY (operation_type_id) REFERENCES operation_type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE product DROP FOREIGN KEY FK_D34A04AD44AC3583');
        $this->addSql('DROP INDEX IDX_D34A04AD44AC3583 ON product');
        $this->addSql('ALTER TABLE product DROP operation_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_operation_type DROP FOREIGN KEY FK_F0C774944584665A');
        $this->addSql('ALTER TABLE product_operation_type DROP FOREIGN KEY FK_F0C77494668D0C5E');
        $this->addSql('DROP TABLE product_operation_type');
        $this->addSql('ALTER TABLE product ADD operation_id INT NOT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04AD44AC3583 FOREIGN KEY (operation_id) REFERENCES operation_type (id)');
        $this->addSql('CREATE INDEX IDX_D34A04AD44AC3583 ON product (operation_id)');
    }
}
