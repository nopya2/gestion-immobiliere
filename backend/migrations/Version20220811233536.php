<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220811233536 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level_type ADD cycle_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE level_type ADD CONSTRAINT FK_E5FBAC385EC1162 FOREIGN KEY (cycle_id) REFERENCES cycle (id)');
        $this->addSql('CREATE INDEX IDX_E5FBAC385EC1162 ON level_type (cycle_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE level_type DROP FOREIGN KEY FK_E5FBAC385EC1162');
        $this->addSql('DROP INDEX IDX_E5FBAC385EC1162 ON level_type');
        $this->addSql('ALTER TABLE level_type DROP cycle_id');
    }
}
